# Generated by Django 3.2.2 on 2021-09-01 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TestModel2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test', models.TextField(blank=True, null=True)),
                ('test2', models.ImageField(blank=True, null=True, upload_to='chat_test_img/')),
            ],
        ),
        migrations.CreateModel(
            name='TestModel3',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test3', models.FileField(blank=True, null=True, upload_to='chat_test_img/')),
            ],
        ),
    ]
