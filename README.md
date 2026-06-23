<img width="401" height="827" alt="Captura de tela login" src="https://github.com/user-attachments/assets/32833b62-4b3b-4295-a94b-4bf2bd2e5492" />
# 🍔 InfnetFood

Aplicativo mobile de delivery de comida desenvolvido com **React Native** e **Expo**, com suporte a autenticação, carrinho de compras, navegação por categorias, restaurantes e pedidos.

---

## 📱 Telas do Aplicativo

### 🔐 Autenticação
- **LoginScreen** — Tela de login com e-mail e senha (mock)

### 🏠 Início (HomeStack)
- **HomeScreen** — Listagem de categorias e restaurantes em destaque
- **ProductsScreen** — Produtos filtrados por categoria
- **ProductDetailScreen** — Detalhes de um produto com opção de adicionar ao carrinho
- **RestaurantDetailScreen** — Detalhes do restaurante com seu cardápio

### 🛒 Carrinho (CartStack)
- **CartScreen** — Itens adicionados ao carrinho com controle de quantidade
- **CheckoutScreen** — Finalização do pedido com endereço e forma de pagamento

### 👤 Perfil (ProfileStack)
- **ProfileScreen** — Dados do usuário logado
- **OrdersScreen** — Histórico de pedidos realizados
- **MapScreen** — Mapa com localização dos restaurantes
- **SettingsScreen** — Configurações do app (tema claro/escuro)

---

## 🗂️ Categorias Disponíveis

| Ícone | Categoria  |
|-------|------------|
| 🍔    | Lanches    |
| 🥤    | Bebidas    |
| 🍰    | Sobremesas |
| 🍕    | Pizzas     |
| 🥗    | Saudável   |
| 🍝    | Massas     |

---

## 🍽️ Restaurantes

| Restaurante          | Categoria   | Avaliação | Entrega    |
|----------------------|-------------|-----------|------------|
| Burger Palace        | Lanches     | ⭐ 4.8    | 25–35 min  |
| Pizza Center         | Pizzas      | ⭐ 4.5    | 30–45 min  |
| Sushi Cinelândia     | Japonês     | ⭐ 4.7    | 40–55 min  |
| Churrascaria Carioca | Churrasco   | ⭐ 4.6    | 35–50 min  |
| Café do Paço         | Café        | ⭐ 4.3    | 15–25 min  |
| Tapioca & Cia        | Nordestino  | ⭐ 4.4    | 20–30 min  |
| Padaria Imperial     | Padaria     | ⭐ 4.2    | 15–20 min  |
| Thai Garden          | Tailandês   | ⭐ 4.6    | 35–50 min  |
| La Pasta Nostra      | Italiano    | ⭐ 4.5    | 30–45 min  |
| Açaí do Centro       | Saudável    | ⭐ 4.9    | 20–30 min  |

---

## ⚙️ Funcionalidades

- ✅ Autenticação com usuários mock (e-mail e senha)
- ✅ Navegação por categorias de alimentos
- ✅ Listagem de restaurantes com avaliação e tempo de entrega
- ✅ Visualização detalhada de produtos e restaurantes
- ✅ Carrinho com adição, remoção e atualização de quantidade
- ✅ Finalização de pedido com endereço e forma de pagamento
- ✅ Histórico de pedidos com status (Em preparo, A caminho, Entregue)
- ✅ Mapa com localização dos restaurantes
- ✅ Tema claro/escuro
- ✅ Notificações push com `expo-notifications`
- ✅ Badge de quantidade no ícone do carrinho

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| [React Native](https://reactnative.dev/) | Framework mobile |
| [Expo](https://expo.dev/) | Plataforma de desenvolvimento |
| [React Navigation](https://reactnavigation.org/) | Navegação entre telas |
| [Axios](https://axios-http.com/) | Requisições HTTP |
| [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) | Animações |
| [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Notificações push |
| [React Native WebView](https://github.com/react-native-webview/react-native-webview) | Renderização web |
| [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/) | Deep linking |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado
- Aplicativo **Expo Go** no celular (Android ou iOS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/infnet-food.git

# Acesse a pasta do projeto
cd infnet-food

# Instale as dependências
npm install

# Inicie o projeto
npx expo start

Nome,E-mail,Senha
Admin,admin@admin.com,admin123
João Silva,joao@email.com,123456


<img width="401" height="827" alt="Captura de tela login" src="https://github.com/user-attachments/assets/aa554c9b-4ed8-4a63-ac64-b49dfbcb7223" />
<img width="407" height="842" alt="Captura de tela pagina inicial" src="https://github.com/user-attachments/assets/d9988cfa-ef2a-4cc3-b1a1-44115b3d1b41" />
<img width="405" height="837" alt="Captura de tela carrinho" src="https://github.com/user-attachments/assets/2961e8f3-392b-430b-a5d8-a010e87d85ef" />
<img width="390" height="847" alt="Captura de tela finalizar pedido" src="https://github.com/user-attachments/assets/d4721058-f53a-4eac-8535-9985851c87c3" />
<img width="401" height="841" alt="Captura de tela perfil" src="https://github.com/user-attachments/assets/4d05e3fb-5367-4a50-be1d-227e393ffc72" />
<img width="410" height="845" alt="Captura de tela pedidos" src="https://github.com/user-attachments/assets/1778d7d6-4af7-4838-8aef-36fb12cca178" />
<img width="402" height="851" alt="Captura de tela mapa" src="https://github.com/user-attachments/assets/f95abfd2-a209-43e6-ba72-532da0b599a6" />


Este projeto foi desenvolvido para fins acadêmicos — Instituto Infnet.
