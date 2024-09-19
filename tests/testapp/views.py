from django import forms
from django.http import HttpResponse
from django.shortcuts import render
from django_prose_editor.fields import ProseEditorFormField

class TestForm(forms.Form):
  message = ProseEditorFormField()

def test_editor(request):
  form = TestForm()
  return render(request, 'test_form.html', { 'form': form })
