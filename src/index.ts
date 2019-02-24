//
// ─── HOT MODULE REPLACEMENT ─────────────────────────────────────────────────────
//
/* eslint-disable */
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(
    [
      /* dependencies */
    ],
    // @ts-ignore
    status => {
      // dependenciesがupdateされたときのハンドラ
    },
  )
  // @ts-ignore
  module.hot.dispose(data => {
    // eslint-disable-line
    // 現在のmodule(index.ts)がupdateされる場合のハンドラ
  })
}
