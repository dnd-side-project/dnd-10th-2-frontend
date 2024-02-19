import { SVGProps } from 'react';
import sprites from './sprite/symbol/sprite.svg';
import * as Icons from './assets';

interface Props extends SVGProps<SVGSVGElement> {
  id: keyof typeof Icons;
  size?: number;
}

export const SvgIcon = ({
  id,
  size = 24,
  fill = 'default',
  stroke = 'default',
  ...rest
}: Props) => {
  return (
    <svg fill={fill} stroke={stroke} height={size} width={size} {...rest}>
      <use href={`${sprites}#${id}`} />
    </svg>
  );
};
