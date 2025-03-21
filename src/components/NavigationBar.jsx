export default function NavigationBar({ children }) {
  return (
    <nav className='fixed left-0 right-0 top-0 w-full bg-white shadow-md flex items-center h-24 p-4 justify-between rounded-bl-lg rounded-br-lg z-40 md:p-6'>
      {children}
    </nav>
  );
}
