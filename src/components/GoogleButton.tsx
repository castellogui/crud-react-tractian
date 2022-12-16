interface GoogleButtonProps {
  refDiv: any;
}

export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <div ref={props.refDiv} className="w-full h-10 flex justify-center">
      <div
        id="g_id_onload"
        data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        data-callback="handleGoogleToken"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
}
