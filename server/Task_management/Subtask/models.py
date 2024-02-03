from django.db import models
from User.models import User
from Task.models import Task


class Subtask(models.Model):
    title = models.CharField(max_length=255, blank=False)
    mark_done = models.BooleanField(default=False)
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        verbose_name="Task",
        null=True,
        related_name="subtasks"
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="User ID",
        null=True,
        related_name="subtasks"
    )
    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True)

    def __str__(self):
        return f"Title: {self.title}\n Task: {self.task}\n Done: {self.mark_done} \n Created by:{self.created_by}"
