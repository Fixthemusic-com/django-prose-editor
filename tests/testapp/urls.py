from django.contrib import admin
from django.urls import path
from .views import test_editor
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", test_editor),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

