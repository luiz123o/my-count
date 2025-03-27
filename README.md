# My Regressive - Event Countdown Tracker

Aplicativo mobile para acompanhar contagens regressivas de eventos importantes.

## Estrutura do Projeto

O projeto segue os princípios de Clean Architecture e MVVM (Model-View-ViewModel). Aqui está a explicação da estrutura de pastas:

```
src/
├── domain/                 # Camada de domínio (regras de negócio)
│   ├── entities/          # Entidades do domínio (Event, Countdown)
│   ├── repositories/      # Interfaces dos repositórios
│   └── usecases/         # Casos de uso da aplicação
│
├── data/                  # Camada de dados
│   ├── repositories/      # Implementações dos repositórios
│   └── datasources/      # Fontes de dados (AsyncStorage, API)
│
├── presentation/         # Camada de apresentação (UI)
│   ├── screens/         # Telas da aplicação
│   ├── components/      # Componentes reutilizáveis
│   └── viewmodels/      # ViewModels (lógica de apresentação)
│
├── core/                # Configurações e utilitários
│   ├── config/         # Configurações (DI, temas)
│   ├── utils/          # Funções utilitárias
│   └── constants/      # Constantes da aplicação
│
└── shared/             # Código compartilhado
    ├── types/          # Tipos e interfaces compartilhadas
    └── services/       # Serviços compartilhados
```

### Responsabilidades de Cada Camada

#### Domain
- Contém as regras de negócio da aplicação
- Define as entidades e suas propriedades
- Define as interfaces dos repositórios
- Contém os casos de uso que orquestram as operações

#### Data
- Implementa o acesso a dados
- Implementa os repositórios definidos no domínio
- Gerencia a persistência de dados
- Lida com transformação de dados

#### Presentation
- Gerencia a interface do usuário
- Contém os componentes React Native
- Implementa os ViewModels que conectam UI com lógica
- Gerencia o estado da UI

#### Core
- Configurações globais
- Injeção de dependências
- Utilitários comuns
- Constantes da aplicação

#### Shared
- Código compartilhado entre camadas
- Tipos e interfaces comuns
- Serviços compartilhados

## Princípios Aplicados

### Clean Architecture
- Separação clara de responsabilidades
- Dependências apontam para dentro
- Domínio independente de frameworks
- Testabilidade em todas as camadas

### MVVM (Model-View-ViewModel)
- Model: Entidades e regras de negócio
- View: Componentes React Native
- ViewModel: Classes que gerenciam estado e lógica de UI

### SOLID
- Single Responsibility: Cada classe tem uma única responsabilidade
- Open/Closed: Fácil estender sem modificar código existente
- Liskov Substitution: Interfaces bem definidas
- Interface Segregation: Interfaces pequenas e específicas
- Dependency Inversion: Dependências injetadas via construtor

## Tecnologias Utilizadas

- React Native
- TypeScript
- MobX (Gerenciamento de Estado)
- NativeWind (Estilização)
- AsyncStorage (Persistência)

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm start
```

3. Para desenvolvimento:
```bash
npm run dev
```

## Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Push para a branch
4. Crie um Pull Request

## Licença

MIT
