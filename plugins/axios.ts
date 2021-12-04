export default function ({ $axios, redirect }) {
  $axios.onError((err) => {
    if (err.response.status === 404) {
      console.log('plugins/axios.ts: 404エラー検知！！')
      redirect('/404/')
    }
  })
}
