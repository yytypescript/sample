/**
 * ログインAPI
 *
 * このサンプルアプリでは便宜的にセッションストレージを用います。
 * 実際の実装では、サーバの認証APIを呼び出す実装になると思います。
 *
 * セッションストレージはブラウザのタブが閉じられるまで値を保持するストレージです。
 * 似たものにローカルストレージがありますが、ローカルストレージはブラウザのタブを閉じてもデータが消えない点と、タブ間でデータが共有される点が異なります。
 * このサンプルアプリでは複数のタブを開いて、異なるユーザ名で同時にログインしたいので、ローカルストレージではなくセッションストレージを使います。
 */
export class LoginAPI {
  async fetchUsername(): Promise<string | null> {
    return sessionStorage.getItem("username");
  }

  async login(username: string): Promise<void> {
    sessionStorage.setItem("username", username);
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem("username");
  }
}
