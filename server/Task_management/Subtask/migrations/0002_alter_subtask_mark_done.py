# Generated by Django 5.0.1 on 2024-02-03 08:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Subtask", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="subtask",
            name="mark_done",
            field=models.BooleanField(default=False),
        ),
    ]