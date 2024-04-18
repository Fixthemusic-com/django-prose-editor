import json

from django import forms


class ProseEditorWidget(forms.Textarea):
    class Media:
        css = {
            "screen": [
                "django_prose_editor/material-icons.css",
                "django_prose_editor/editor.css",
            ]
        }
        js = [
            "django_prose_editor/editor.js",
            "admin/js/jquery.init.js",
            "django_prose_editor/init.js",
        ]

    def __init__(self, *args, **kwargs):
        self.config = kwargs.pop("config", {})
        super().__init__(*args, **kwargs)

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["attrs"]["data-django-prose-editor"] = json.dumps(
            self.config
            or {
                "types": None,
                "history": True,
                "html": True,
            },
            separators=(",", ":"),
        )
        return context
