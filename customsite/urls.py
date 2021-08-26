from django.conf import settings
from django.contrib import admin
from django.template.context_processors import static
from django.urls import path, include

urlpatterns = [
    path('account/', include('accountapp.urls')),
    path('main/', include('mainapp.urls')),
    path('screen/', include('boardapp.urls')),
    path('comment/', include('commentapp.urls')),

    path('admin/', admin.site.urls),
]
