from django import forms
from .models import *

# class SubscriberForm(forms.ModelForm):
#     class Meta:
#         model = Subscriber
#         exclude = [""]
#
#     name = forms.CharField(
#         min_length=2,
#         widget=forms.TextInput(
#             attrs={'placeholder': 'Ваше имя...', 'class': 'form-control'}
#         )
#     )
#     email = forms.EmailField(
#         min_length=2,
#         widget=forms.EmailInput(
#             attrs={'placeholder': 'Ваш email...', 'class': 'form-control'}
#         )
#     )