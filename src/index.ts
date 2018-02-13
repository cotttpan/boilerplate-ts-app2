//
// ─── HOT MODULE REPLACEMENT ─────────────────────────────────────────────────────
//
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept([/* dependencies */], status => {
    // dependenciesがupdateされたときのハンドラ
  })
  // @ts-ignore
  module.hot.dispose(data => {
    // 現在のmodule(index.ts)がupdateされる場合のハンドラ
  })
}

