{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/44a71ff39c182edaf25a7ace5c9454e7cba2c658.tar.gz") {}
}:

let
  poetry2nix = import (fetchTarball {
    url = "https://github.com/nix-community/poetry2nix/archive/a313fd7169ae43ecd1a2ea2f1e4899fe3edba4d2.tar.gz";
    sha256 = "1z9x77kx9ggrvnj7z62c2vyj3cnwzwlzhghcq4ffk9ph030xl9vl";
  }) {
    inherit pkgs;
  };

  pythonEnv = poetry2nix.mkPoetryEnv {
    projectDir = ./.;
    editablePackageSources = {
      django-prose-editor = ./.;
    };
    overrides = poetry2nix.overrides.withDefaults (final: prev: {
      nh3 = prev.nh3.override {
        preferWheel = true;
      };
    });
  };

in pkgs.mkShell {
  buildInputs = [
    pythonEnv
    pkgs.nodejs
    pkgs.poetry
  ];

  shellHook = ''
    echo "Python library development environment"
    echo "Poetry and Node.js are available"
  '';
}
