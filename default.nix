{ pkgs ? import <nixpkgs> {} }:

let
  packageJSON = pkgs.lib.importJSON ./package.json;
in

pkgs.stdenv.mkDerivation rec {
  name = "herp-inc-snabbdom-jsx";
  version = packageJSON.version;

  src = pkgs.nix-gitignore.gitignoreSource [] ./.;

  buildInputs = [
    pkgs.nodejs-slim
    pkgs.yarn
  ];

  buildPhase=''
    HOME=$TMP yarn install --frozen-lockfile
    yarn tsc --project ./tsconfig.build.json
    cp -r jsx-runtime.d.ts jsx-runtime.js package.json README.md ./dist
    cd ./dist
    yarn pack
    cd ..
    mv dist/*.tgz .
  '';

  dontInstall = true;

  doDist = true;
  tarballs = "herp-inc-snabbdom-jsx-v${version}.tgz";
}
