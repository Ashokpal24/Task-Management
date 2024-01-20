# Generated by Django 5.0.1 on 2024-01-19 03:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ProjectGroup", "0008_alter_projectmembership_member_and_more"),
        ("Task", "0003_task_project_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="project_id",
            field=models.ForeignKey(
                default=-1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="task_list",
                to="ProjectGroup.projectgroup",
                verbose_name="Project ID",
            ),
            preserve_default=False,
        ),
    ]