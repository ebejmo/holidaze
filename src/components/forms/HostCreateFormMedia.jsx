import FormField from './FormField';

export default function HostCreateFormMedia({
  register,
  errors,
  isSubmitting,
}) {
  return (
    <>
      <h4 className="h6 mb-2">Images (optional)</h4>

      {[1, 2, 3].map((i) => (
        <FormField
          key={i}
          label={`Image URL #${i}`}
          name={`media${i}`}
          type="url"
          register={register}
          error={errors[`media${i}`]}
          disabled={isSubmitting}
          placeholder="https://bejjleif.com.jpg"
        />
      ))}
    </>
  );
}
