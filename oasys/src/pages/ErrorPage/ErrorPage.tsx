function ErrorPage({ login }: { login: boolean | null }) {
  console.log('ErrorPage', login);
  return login == null ? (
    <></>
  ) : (
    <div style={{ margin: '10px' }}>
      <h3 style={{ color: 'red' }}>로그인이 필요합니다.</h3>
      GUEST LOGIN =&gt; id: guest11, password: 1111
    </div>
  );
}

export default ErrorPage;
