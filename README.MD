
# Modoc Micro Frontend

Add Npm Registry : 
```bash
npm config set '@modoc-component:registry' https://node.bit.cloud

```

There is 3 Package :

1. **Navbar**
Install with : 
```bash
npm install @modoc/modoc-mf.components.nav-bar@latest

```
2. **mobile-navbar**
Install with : 
```bash
npm install @modoc/modoc-mf.components.mobile-navbar-new@latest

```

3. **footer**
Install with : 
```bash
npm install @modoc/modoc-mf.components.footer@latest

```

# API Reference

> Navbar

Navbar is component on the top of Modoc App that included menu. List of Navbar Props :

| Props Name        |                        Accept                      |      Required      |
| -------------     | :-----------------------------------------------:  |    :---------:     |
| variant           |   `"primary"`   `"secondary"`  `"reverse-primary"` |        ✅          |
| isBackNav         |                        Boolean                     |        ❌          |           
| withSearch        |                        Boolean                     |        ❌          |           
| withNotification  |                        Boolean                     |        ❌          |           
| title             |                        Boolean                     |        ✅          |           
