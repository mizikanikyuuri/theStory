from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import portal.routing
import gamemain.routing

websocket_urlpatterns=gamemain.routing.websocket_urlpatterns+portal.routing.websocket_urlpatterns
application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})