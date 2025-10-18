export default function CommentElement({fullName,username,content}:{fullName:string,username:string,content:string}) {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="sarahjv"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <p className="flex items-center text-gray-200">
            {fullName} · 
            <span className="text-sm">17 hour ago</span>
          </p>
          <p className="text-sm text-gray-200">@{username}</p>
          <p className="mt-3 text-sm">
            {content}
          </p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
}
