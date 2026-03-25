# PakinDuck — Webflow Component Library

Biblioteca de componentes React para o **Webflow Apps SDK**. Todos os componentes são renderizados como Apps no Designer do Webflow via `@webflow/react`.

---

## Componentes disponíveis

| Componente | Grupo | Descrição |
|---|---|---|
| `CheckboxCard` | Form | Card com checkbox visual |
| `ColorPicker` | Form | Seletor de cor com swatches |
| `CurrencyInput` | Form | Input de valor monetário |
| `DatePicker` | Form | Calendar popup para seleção de data |
| `Dimension3DInput` | Form | Input de 3 dimensões (W × H × D) com unidades |
| `DimensionInput` | Form | Input de 2 dimensões (W × H) com unidades |
| `Dropdown` | Form | Select estilizado com busca |
| `FileUpload` | Form | Campo de upload de arquivo simples |
| `FileUploadDropzone` | Form | Zona de drag & drop para upload |
| `NumberInput` | Form | Input numérico com stepper |
| `PillSelect` | Form | Seleção múltipla via pills |
| `RadioButton` | Form | Radio button estilizado |
| `RadioCard` | Form | Card com seleção exclusiva |
| `Stepper` | Form | Incremento/decremento numérico |
| `TextInput` | Form | Input de texto simples |
| `Textarea` | Form | Textarea com auto-resize |
| `Toggle` | Form | Switch on/off |
| `YesNo` | Form | Seleção binária Sim/Não |

---

## Como usar no Webflow

### Pré-requisitos
```bash
npm install
```

### Publicar a biblioteca
```bash
npm run share
# ou
npx webflow library share
```

Após o share, os componentes aparecem na aba **Apps** do Webflow Designer. Arraste para a canvas normalmente.

### Configurar props no Designer
Cada componente expõe props editáveis no painel direito do Designer:
- **Label** — texto da label do campo
- **Disabled** — desabilita o componente
- **Error Message** — mostra mensagem de erro em vermelho

---

## Estados internos vs. persistência

### Por que o estado não persiste?

Os componentes usam `useState` internamente para UX (abrir/fechar calendário, hover, etc.). **Isso é esperado** — esses estados são de UI, não de dados.

O problema de persistência de **valor** (ex: data selecionada, dimensões digitadas) acontece porque os `.webflow.tsx` não expõem as props `value`/`onChange` para o Webflow. O Webflow não tem um sistema nativo de two-way data binding.

### Como resolver — 3 abordagens

#### 1. Webflow Forms nativo (recomendado para formulários simples)
Use os componentes PakinDuck **dentro** de um Form nativo do Webflow. O submit do form captura os dados. Para campos customizados, use um `<input type="hidden">` atualizado via JavaScript customizado na página:

```html
<!-- No Webflow, adicione Custom Code na página -->
<script>
  // Escuta eventos dos componentes React via postMessage ou atributos data-*
  document.addEventListener('DOMContentLoaded', () => {
    // Os componentes expõem onChange que pode ser capturado
  });
</script>
```

#### 2. localStorage (persistência entre navegações)
Adicione um Custom Code Script na página que persiste os valores:

```javascript
// Exemplo para DatePicker
window.addEventListener('message', (e) => {
  if (e.data?.type === 'datepicker-change') {
    localStorage.setItem('form_date', e.data.value);
  }
});
// Ao carregar, restaura o valor
const saved = localStorage.getItem('form_date');
```

#### 3. Webflow Logic + CMS (persistência real)
Para dados que precisam ser salvos no servidor:
1. Configure um **Form** no Webflow com campos hidden
2. Use **Webflow Logic** para processar o submit
3. Ou conecte a um serviço externo (Make, Zapier, etc.)

---

## File Upload — Como fazer funcionar no Webflow

O componente `FileUpload` seleciona o arquivo no browser e armazena o objeto `File` em memória. **Ele não faz upload automaticamente** — precisa de integração com um serviço.

### Opções de integração

#### Opção A — Cloudinary (mais simples)
```javascript
// Custom Code na página Webflow
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'SEU_PRESET'); // configurar no Cloudinary

  const res = await fetch('https://api.cloudinary.com/v1_1/SEU_CLOUD/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.secure_url; // URL pública do arquivo
}
```

#### Opção B — Uploadcare / Filestack
Ambos têm SDKs prontos e planos gratuitos generosos. Substituem o componente inteiro por um widget próprio.

#### Opção C — Backend próprio (Next.js, Node, etc.)
```javascript
async function uploadToServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
```

### Conectar o componente FileUpload ao upload

No estado atual, o componente `FileUpload` chama `onChange(file)` quando um arquivo é selecionado. Para conectar ao upload, você precisaria modificar o componente para receber uma prop `onUpload` ou usar JavaScript customizado na página para interceptar o evento.

**Solução mais prática hoje:** Substituir o `FileUpload` por um widget de serviço externo (Uploadcare, Cloudinary) embutido via Custom Embed no Webflow. Esses widgets já incluem o upload e retornam a URL do arquivo.

---

## Estrutura do projeto

```
src/
  components/
    ComponentName/
      ComponentName.tsx          # Componente React puro
      ComponentName.webflow.tsx  # Wrapper para o Webflow Apps SDK
```

## Stack

- React 18
- TypeScript
- Vite
- `@webflow/react` — SDK de componentes
- `@webflow/data-types` — tipos das props
- `lucide-react` — ícones

---

## Repositório

[github.com/rafaeliribarrem/PakinDuck-Handoff](https://github.com/rafaeliribarrem/PakinDuck-Handoff)
