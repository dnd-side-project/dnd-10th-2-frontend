import { SVGProps } from 'react';
import sprites from './sprite/symbol/sprite.svg';
import * as Icons from './assets';

export type IconIdType = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  id: IconIdType;
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
