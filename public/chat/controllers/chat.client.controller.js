'use strict';
angular.module('chat').controller('ChatController', ['$scope', 'Socket',
    function($scope, Socket) {
        $scope.messages = [];
        
        Socket.on('chatMessage', function(message) {
            $scope.messages.push(message);     
        });

        $scope.sendMessage = function() {
            //this is the $scope. In the view the input links itself to the model
            //under the name messageText, hence the scope object has reference to it.
            var message = {
                text: this.messageText
            };
            
            //use the Socket service to send the message
            //Socker service will user the socket.
            Socket.emit('chatMessage', message);

            //empty the text once msg sent
            this.messageText = '';
        };
        
        //$scope event ($on) on $destroy remove the listener using the Socket service
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        });
    }
]);
