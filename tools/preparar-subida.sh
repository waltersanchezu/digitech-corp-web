#!/bin/bash
# Prepara SOLO los archivos que cambiaron desde la ultima publicacion,
# listos para subir al File Manager de cPanel (public_html).
#
#   bash tools/preparar-subida.sh          -> muestra que cambio y arma el paquete
#   bash tools/preparar-subida.sh --marcar -> marca lo actual como ya publicado
set -e
cd "$(dirname "$0")/.."

if [ "$1" = "--marcar" ]; then
  git tag -f deployed main -m "Publicado en digitech-corp.com el $(date +%Y-%m-%d)" >/dev/null
  echo "✅ Marcado: main es ahora el estado publicado."
  exit 0
fi

if ! git rev-parse deployed >/dev/null 2>&1; then
  echo "❌ No existe el tag 'deployed'. Crealo con: git tag deployed main"; exit 1
fi

# Rutas que NUNCA se suben al servidor (solo desarrollo)
EXCLUIR='^(tools/|\.claude/|\.gitignore$|.*\.scss$|.*\.css\.map$)'

CAMBIOS=$(git diff --name-only --diff-filter=ACMR deployed^{} main | grep -Ev "$EXCLUIR" || true)
BORRADOS=$(git diff --name-only --diff-filter=D deployed^{} main | grep -Ev "$EXCLUIR" || true)

if [ -z "$CAMBIOS" ] && [ -z "$BORRADOS" ]; then
  echo "Nada nuevo que publicar: main == deployed."; exit 0
fi

rm -rf _subir_a_cpanel && mkdir -p _subir_a_cpanel
echo "📤 ARCHIVOS A SUBIR a public_html (respetando carpetas):"
echo "$CAMBIOS" | while read -r f; do
  [ -z "$f" ] && continue
  mkdir -p "_subir_a_cpanel/$(dirname "$f")"
  cp "$f" "_subir_a_cpanel/$f"
  echo "   $f"
done

if [ -n "$BORRADOS" ]; then
  echo; echo "🗑️  BORRAR MANUALMENTE en cPanel:"
  echo "$BORRADOS" | sed 's/^/   /'
fi

cd _subir_a_cpanel && zip -qr ../subir-a-cpanel.zip . && cd ..
echo
echo "📦 Paquete listo: subir-a-cpanel.zip"
echo "   1) cPanel > File Manager > public_html"
echo "   2) Upload del zip > Extract (sobreescribe respetando rutas)"
echo "   3) Borra el zip del servidor"
echo "   4) Al confirmar que se ve bien: bash tools/preparar-subida.sh --marcar"
