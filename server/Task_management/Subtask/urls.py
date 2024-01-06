from django.urls import path
from .views import (
    SubtaskListView,
    SubtaskDetailedView
)

urlpatterns = [
    path('subtask/', SubtaskListView.as_view(), name='Subtask'),
    path('subtask/<int:subtask_id>', SubtaskDetailedView.as_view(), name='Subtask/id')

]
