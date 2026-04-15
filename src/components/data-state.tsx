type DataStateProps = {
  title: string;
  message: string;
};

export function DataState({ title, message }: DataStateProps) {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5 text-center">
        <h1 className="h3 mb-3">{title}</h1>
        <p className="text-body-secondary mb-0">{message}</p>
      </div>
    </section>
  );
}
