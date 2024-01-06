from django.contrib import admin
from django.urls import include, path
from User import urls as User_urls
from Task import urls as Task_urls
from Subtask import urls as Subtask_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(User_urls)),
    path("", include(Task_urls)),
    path("", include(Subtask_urls)),
]
