# Generated by Django 3.2.2 on 2021-09-20 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boardapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='boardmodel',
            name='Comment_Time',
            field=models.TimeField(auto_now=True),
        ),
    ]