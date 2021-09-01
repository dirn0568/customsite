# Generated by Django 3.2.2 on 2021-09-01 05:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('boardapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Board_Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Comment_line', models.CharField(max_length=50)),
                ('Comment_Time', models.DateField(auto_now_add=True)),
                ('Comment_Board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='boardapp.boardmodel')),
                ('Comment_User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
