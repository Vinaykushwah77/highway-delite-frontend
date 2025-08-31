import SigninForm from "../components/SigninForm";

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full md:w-1/3 bg-white relative flex flex-col">
        <div className="hidden md:flex absolute top-6 left-6 items-center">
          <img src="/top.png" alt="logo" className="h-6 w-auto mr-2" />
          <span className="font-bold">HD</span>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 md:px-10">
          <SigninForm />
        </div>
      </div>
      <div className="hidden md:block w-2/3">
        <img
          src="/right-column.png"
          alt="Auth illustration"
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>
    </div>
  );
}
