# River
**version: 3.0.2**
## What, Why, How ?
River 是一种基于canvas的轻量级图形引擎。在面对小型定制化图像绘制需求时，重型图形引擎无法做到良好的兼容性和开放性，并且极大的提高了项目依赖性，处处受重型图形引擎掣肘。相反River只需通过**三个接口与三个类**的高度精简和自定义结构即可做出定制化需求。

在该Demo中River是基于React进行加载和使用的，事实上River并不受制于框架，依然可以在Vue、Angular等框架中被良好导入。

## Install
先安装nodeJs，然后在项目根目录下执行以下代码既可运行Demo应用。

```js
npm install
npm run start
```
> [http://nodejs.cn/](http://nodejs.cn/)
> [http://npm.taobao.org/](http://npm.taobao.org/) 

## Description
River的核心部分，即便是之后的一些widget、animation的实现也是基于如下6个组件。

### Interface
- ## iContainer
      容器接口，实现该接口后即可处理事件传递和子view管理。

- ## iAnimations
      动画接口，实现该接口后即可进行动画算法。

- ## iLayout
      布局接口，实现该接口可对子View制定布局。

### Class

## Activity
```js
Stage对象，负责Canvas事件的初始化和子对象管理，可以理解为它是一个超级Container
```
**所有已实现的接口：**

*iContainer*

**所有已知的子类：**

*无*

---

## View
```js
原子对象，除Activity以外所有视图组件都直接或间接继承至View。
```
**所有已实现的接口：**

*无*

**所有已知的子类：**

*Container*

---

## Container
```js
容器对象，既实现了iC的View，使其可以作为容器装载其他子View。例：ListView
```
- View
    - Container

**所有已实现的接口：**

*iContainer*

**所有已知的子类：**

*无*

---

## Implements
此处罗列一些基于上述三个核心对象的实现，作为组件沉淀。也可以作为Demo参考。

### Animations
## Alpha

**所有已实现的接口：**

*iAnimations*

**所有已知的子类：**

*无*

---
## Trans

**所有已实现的接口：**

*iAnimations*

**所有已知的子类：**

*无*

---
### Layouts
暂无实现

### Widget
## Button
- View
  - Button

**所有已实现的接口：**

*无*

**所有已知的子类：**

*无*

---

## HelloWorld
```js
class MainActivity extends view.Activity{
  	private btn: widget.Button;
  	onCreate(){
  		this.btn = new widget.Button();
  		this.btn.txt = "Button";
  		this.btn.addClickEvent(()=>{
  			console.log("button adction!");
  		})
  		this.addchild(this.btn);
  	}
}
```


