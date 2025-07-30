# ShareShade

> A tiny, zero-dependency library for applying a shared gradient overlay across multiple DOM elements – no CSS imports needed!

![npm](https://www.npmjs.com/package/shareshade)
![license](https://github.com/Jakub6Matejicek/Shareshade/blob/main/LICENSE)

---

## ✨ What is ShareShade?

**ShareShade** lets you visually connect multiple HTML elements with a single continuous background – typically a gradient. It creates the illusion of unity between elements using an automatically injected overlay.

✅ Zero dependencies  
✅ No manual CSS imports  
✅ Works with Vanilla JS, React, Vue, Angular, Next.js  

---

## 📦 Installation


Using npm:

```bash
npm install shareshade
```

---

## 🔧 Basic Usage

#### 1. Plain HTML / Vanilla JS
```html
<script src="shareshade.js"></script>
<script>
  new ShareShade({
    selector: '.item',
    background: 'linear-gradient(to right, #e66465, #9198e5)'
  });
</script>
```


#### 2. React / Next.js

```js
import ShareShade from 'shareshade';
import 'shareshade/shareshade.css';

useEffect(() => {
  const shade = new ShareShade({
    selector: '.highlight',
    background: 'linear-gradient(to right, #ff8a00, #e52e71)' //or any other gradient/image
  });

  return () => shade.destroy();
}, []);
```

#### 3. Vue 3

```js
import ShareShade from 'shareshade';
import 'shareshade/shareshade.css';

export default {
  mounted() {
    this.shade = new ShareShade({
      selector: '.box',
      background: 'linear-gradient(to top left, #6a11cb, #2575fc)',
    });
  },
  beforeUnmount() {
    this.shade.destroy();
  }
};
```

#### 4. Angular

```js
import ShareShade from 'shareshade';
import 'shareshade/shareshade.css';

@Component({...})
export class MyComponent implements AfterViewInit, OnDestroy {
  private shade!: ShareShade;

  ngAfterViewInit() {
    this.shade = new ShareShade({
      selector: '.highlight',
      background: 'linear-gradient(to bottom, #00f260, #0575e6)'
    });
  }

  ngOnDestroy() {
    this.shade.destroy();
  }
}
```

#### ⚙️ Options

When creating a new `ShareShade` instance, you can pass the following options:

| Option       | Type     | Required | Default | Description                                                              |
| ------------ | -------- | -------- | ------- | ------------------------------------------------------------------------ |
| `selector`   | `string` | ✅ Yes    | —       | CSS selector for the target elements that should share a single overlay. |
| `background` | `string` | ✅ Yes    | —       | The shared background, e.g. `linear-gradient(...)` or `url(...)`.        |
| `opacity`    | `number` | ❌ No     | `1`     | Opacity of the overlay (`0` = fully transparent, `1` = fully visible).   |

#### 🧼 API

##### `new ShareShade(options)`
Initializes a new overlay instance.

##### `.update(styles?)`
Recalculates and reapplies the overlay. Automatically called on window resize.

##### `.destroy()`
Removes the overlay and associated event listeners.



#### 🎨 Styling

No need to import any CSS – ShareShade injects the following styles automatically:

```css
.shareshade-overlay {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: inherit;
}
```

You can override this style by using your own `.shareshade-overlay` class if needed.

---

#### 📸 Example

You can find a basic example in `/public/demo.html` or try it online (CodeSandbox link coming soon).

---

📜 License
MIT License © 2025 Jakub Matějíček

---

#### 🔗 Links

NPM: https://www.npmjs.com/package/shareshade

GitHub: https://github.com/your-username/shareshade
