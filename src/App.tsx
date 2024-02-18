import { Input } from '@/components/common/Input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange' // 폼 필드 값 변경 시 유효성 검사를 트리거합니다.
  });

  useEffect(() => {
    console.log(errors.firsstName);
  }, [errors]);

  return (
    <div>
      <Input
        {...register('join', { required: '필요', maxLength: 5 })}
        value={watch('join')}
        setValue={() => setValue('join', '')}
        multiline
        height={100}
        maxLength={12}
        type="default"
        isError={errors.join ? true : false}
        errorText={errors.join?.message as string}
      />
    </div>
  );
}

export default App;
