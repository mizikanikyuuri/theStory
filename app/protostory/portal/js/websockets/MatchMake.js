class Match{
    constructor(userId) {
        this.matchMakingSocket = new WebSocket('ws://localhost:8080/ws/machmaking/'+userId);
        this.matchMakingSocket.onmessage = function(e) {
            //move to game 
        };
        this.matchMakingSocket.onclose = function(e) {
            console.error('match making socket closed unexpectedly');
        };
      }
    joinMatch(){
        this.matchMakingSocket.send(JSON.stringify({
            'message': "joinMatch"
        }));
    }
}
