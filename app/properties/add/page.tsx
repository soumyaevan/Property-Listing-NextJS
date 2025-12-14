import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
  return (
    <section className="">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white dark:bg-gray-700 shadow-md px-6 py-8 mb-4
        rounded-md m-4 md:m-0"
        >
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
