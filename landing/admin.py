from django.contrib import admin
from .models import *

class SubscriberAdmin (admin.ModelAdmin):
    list_display = [field.name for field in Subscriber._meta.fields]
    list_filter = ['name',]
    search_fields = ['name', 'email']

    # list_display = ['name', 'email']
    #exclude = ['email'] отображать только email
    #inlanes = [FieldMappingInLine]
    #field = []
    #search_fields = ['category', 'subCategory', 'suggestKeyword']

    class Meta:
        model = Subscriber


admin.site.register(Subscriber, SubscriberAdmin)