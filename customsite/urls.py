from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('account/', include('accountapp.urls')),
    path('main/', include('mainapp.urls')),
    path('screen/', include('boardapp.urls')),
    path('comment/', include('commentapp.urls')),
    path('chat/', include('chatapp.urls')),
    path('friend/', include('friendapp.urls')),
    path('message/', include('messageapp.urls')),
    path('profile/', include('profileapp.urls')),

    path('game/', include('gameapp.urls')),

    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
