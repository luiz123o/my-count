# Guia de Componentes React Native

## Para Desenvolvedores Web

Se você está vindo do desenvolvimento web, aqui estão as principais diferenças e conceitos que você precisa saber:

### 1. Diferenças Fundamentais
- **HTML → JSX**: Em vez de elementos HTML (`<div>`, `<span>`, etc), usamos componentes React Native (`<View>`, `<Text>`, etc)
- **CSS → Estilos**: 
  - Não usamos CSS diretamente
  - Usamos `StyleSheet` ou bibliotecas como NativeWind (Tailwind para React Native)
  - Flexbox é o padrão (não Grid)
  - Não há herança de estilos

### 2. Mapeamento de Elementos Web para React Native
| Web (HTML) | React Native | Observações |
|------------|--------------|-------------|
| `<div>` | `<View>` | Container básico |
| `<span>`, `<p>` | `<Text>` | Todo texto deve estar dentro de `<Text>` |
| `<button>` | `<Pressable>` ou `<TouchableOpacity>` | Elementos interativos |
| `<input>` | `<TextInput>` | Campos de texto |
| `<img>` | `<Image>` | Imagens |
| `<ul>`, `<ol>` | `<FlatList>` ou `<ScrollView>` | Listas |
| `<a>` | `<Pressable>` com `Linking` | Links |

### 3. Conceitos Importantes
- **Layout**: 
  - Flexbox é o padrão
  - Não há `float` ou `position: fixed`
  - Use `position: 'absolute'` para sobreposição
- **Estilos**:
  - Todos os estilos são camelCase (`backgroundColor`, não `background-color`)
  - Valores são números ou strings
  - Não há unidades (px, em, rem) - tudo é em pixels
- **Interatividade**:
  - Não há `:hover` ou `:focus`
  - Use estados (`useState`) para feedback visual
  - Gestos são mais importantes que cliques

### 4. Boas Práticas
- Use `SafeAreaView` para evitar notch e barra de status
- Prefira `Pressable` sobre `TouchableOpacity` (mais moderno)
- Use `FlatList` para listas longas (melhor performance)
- Evite `ScrollView` com muitos itens
- Use `Modal` para overlays e popups

Este guia explica quando usar cada componente React Native básico, com exemplos práticos do nosso projeto.

## View
O `View` é o componente mais básico e versátil do React Native. É equivalente a uma `<div>` no HTML.

### Quando usar View:
- Para criar containers/layouts
- Para agrupar elementos
- Para criar estruturas de layout (flexbox)
- Quando não precisa de interatividade

### Exemplo do nosso projeto:
```tsx
// Container principal do card
<View className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100">
  // Container do cabeçalho
  <View className="flex-row justify-between items-start mb-3">
    // Container do conteúdo
    <View className="flex-1">
      // ...
    </View>
  </View>
</View>
```

## Pressable
O `Pressable` é um componente que detecta toques e gestos. É mais moderno e flexível que o `TouchableOpacity`.

### Quando usar Pressable:
- Para elementos que precisam responder a toques
- Para botões e elementos interativos
- Quando precisa de feedback visual personalizado
- Quando precisa de gestos mais complexos

### Exemplo do nosso projeto:
```tsx
// Botão de editar
<Pressable
  onPress={() => onEdit(event)}
  className="p-2 rounded-lg bg-gray-50"
>
  <Ionicons name="pencil-outline" size={20} color="#4B5563" />
</Pressable>

// Botão de deletar
<Pressable
  onPress={() => onDelete(event.id)}
  className="p-2 rounded-lg bg-red-50"
>
  <Ionicons name="trash-outline" size={20} color="#EF4444" />
</Pressable>
```

## Text
O `Text` é usado para exibir texto. É o único componente que pode conter texto diretamente.

### Quando usar Text:
- Para exibir qualquer tipo de texto
- Para títulos e subtítulos
- Para labels e descrições
- Para números e valores

### Exemplo do nosso projeto:
```tsx
// Título do evento
<Text className="text-lg font-semibold text-gray-900">
  {event.name}
</Text>

// Data do evento
<Text className="text-sm text-gray-500 mt-1">
  {new Date(event.date).toLocaleDateString()}
</Text>

// Valores do countdown
<Text className="text-2xl font-bold text-primary">
  {countdown.days}
</Text>
```

## ScrollView
O `ScrollView` é usado para criar conteúdo rolável.

### Quando usar ScrollView:
- Quando o conteúdo é maior que a tela
- Para listas curtas (menos de 10 itens)
- Quando precisa de scroll horizontal ou vertical
- Para formulários longos

### Exemplo do nosso projeto:
```tsx
<ScrollView className="flex-1 bg-white">
  <View className="p-6">
    // Conteúdo do formulário
  </View>
</ScrollView>
```

## FlatList
O `FlatList` é usado para renderizar listas longas de forma otimizada.

### Quando usar FlatList:
- Para listas longas (mais de 10 itens)
- Quando precisa de performance otimizada
- Para listas com itens de altura variável
- Quando precisa de pull-to-refresh ou infinite scroll

### Exemplo do nosso projeto:
```tsx
<FlatList
  data={events}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <CountdownCard
      event={item}
      onDelete={handleDeleteEvent}
      onEdit={handleEditPress}
    />
  )}
  contentContainerStyle={styles.listContent}
  ListEmptyComponent={/* ... */}
/>
```

## Modal
O `Modal` é usado para exibir conteúdo em uma tela sobreposta.

### Quando usar Modal:
- Para formulários de criação/edição
- Para diálogos de confirmação
- Para exibir detalhes em tela cheia
- Para menus e popups

### Exemplo do nosso projeto:
```tsx
<Modal
  visible={isFormVisible}
  animationType="slide"
  presentationStyle="pageSheet"
>
  <EventForm
    event={editingEvent}
    onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
    onCancel={handleFormCancel}
  />
</Modal>
```

## SafeAreaView
O `SafeAreaView` é usado para garantir que o conteúdo seja exibido em uma área segura da tela.

### Quando usar SafeAreaView:
- Como container principal da tela
- Para evitar sobreposição com notch ou barra de status
- Para garantir que o conteúdo seja visível em diferentes dispositivos
- Para criar layouts responsivos

### Exemplo do nosso projeto:
```tsx
<SafeAreaView className="flex-1 bg-gray-50">
  // Conteúdo da tela
</SafeAreaView>
``` 