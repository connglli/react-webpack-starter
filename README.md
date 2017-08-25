## Modal 在 Redux 下的状态管理方案

#### 缘由

modal 是日常开发中使用非常频繁的组件，但用 React 开发时我们却经常遇到下面的场景：

```

```

从上图可以看出，在当前页面下有非常多的 modal，在这种场景下，我们将在代码中写非常多的状态来维护它们，就像下面的代码所描述的那样：

``` javascript
this.state = {
  modalA: {
    visible: false,
    propA1: 'A1',
    propA2: 'A2',
  },
  modalB: {
    visible: false,
    propB1: 'B1',
    propB2: 'B2',
  },
  modalC: {
    visible: true,
    propC1: 'C1',
    propC2: 'C2',
  },
  // ...
}
```

与此同时，容器层也会出现若干的 modal：

``` jsx
const {
  modalA,
  modalB,
  modalC,
} = this.state;

<Container>
  <ModalA {...modalA}/>
  <ModalB {...modalB}/>
  <ModalC {...modalC}/>
</Container>
```

这样带来的问题就是，我们将写非常多的代码来维护这样大量的 modal，重复劳动又浪费精力。

#### 解决方案

Redux 提供了一种单向数据流的数据管理方案，它推崇将所有数据放在全局的 `store` 里面，这样的解决方案使得整个 App 中的数据流动非常清晰，数据也非常容易追踪，利用 Redux 的思想我们将很容易给出上面问题的解决方案。

下图描述了我们解决方案的基本架构：

```
  +--------+
  | ModalA | ---------------+
  +--------+ <--------------|--------------------------+
                            |                          |
  +--------+                |                          | modalType/modalProps
  | ModalB | ---------------+                          |
  +--------+                |    ==========     +-------------+
                            +-->   tunnel   --> | ModalTunnel |
  +--------+                |    ==========     +-------------+
  | ModalA | ---------------+                          |
  +--------+                |                          | modalType/modalProps
     ...                    |                          |
  +--------+ <--------------|--------------------------+
  | ModalN | ---------------+
  +--------+

```

我们利用管道的思想，抽象一个顶级元素`ModalTunnel`作为单张页面中唯一的 modal 呈现元素(意思是，只要用到`ModalX`的地方，我们都用`ModalTunnel`来替换掉，并且一张页面中如果有则仅会有一个`ModalTunnel`出现)
，我们把`ModalTunnel`作为管道的 sink 端，各个自己需要的`ModalX`作为 source 端，我们通过`tunnel`来把我们自定义的 modal 注入`ModalTunnel`，并通过`modalType`和`modalProps`来从`ModalTunnel`中提取它们。

#### 代码

##### #1

创建所需要的所有 modal，如`ModalA`，`ModalB`，`ModalC`...

##### #2

定义`ModalTunnel`与`tunnel`：

``` js
import React from 'react';

const __MODAL_MAPPING = {};

// ModalTunnel is used to extract the required modal
const ModalTunnel = ({ modalType, modalProps }) => {
  const SpecificModal = __MODAL_MAPPING[modalType];

  if (SpecificModal) {
    return <SpecificModal {...modalProps} />;
  }

  if (modalType) {
    console.warn(`${modalType} is not tunneled`);
  }

  return null;
};

// tunnel is a function used to connect your customized
// modal with ModalTunnel
export const tunnel = mappings => {
  for (let type in mappings) {
    let modal = mappings[type];

    if (type in __MODAL_MAPPING) {
      console.warn(`Tunnel to [${type}] will be covered from ${__MODAL_MAPPING[type]} to ${modal}`);
    }

    __MODAL_MAPPING[type] = modal;
  }
};

export default ModalTunnel;
```

##### #3

创建一个`state`来保存 modal 信息，并提供`actions`和`reducers`来对其进行操作：
I
``` javascript
export default {
  namespace: 'modal_tunnel',
  state: {
    modalType: '',
    modalProps: {},
  },
  reducers: {
    sync_open(_, { payload }) {
      return {
        modalType: payload.modalType,
        modalProps: {
          ...payload.modalProps,
          visible: true,
        },
      };
    },
    sync_close(state, { payload }) {
      if (state.modalType === '') {
        console.warn('No modal is opening');
      } else if(!payload) {
        console.warn(`It is better when point out the closing modal, now we close ${state.modalType}`);
      } else if (payload.modalType !== state.modalType) {
        console.warn(`${state.modalType} is opening, not ${payload.modalType}, now close ${state.modalType}`);
      }

      return {
        modalType: '',
        modalProps: {},
      };
    },
  },
};
```

#### 思考

#### 参考

[How can I display a modal dialog in Redux that performs asynchronous actions?](https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions)