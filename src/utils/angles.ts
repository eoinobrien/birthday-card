export const ANGLES = {
  closed: {
    left: 170,
  },
  open: {
    left: 30,
  },
};

export const getAngleFromRadian = (radian: number) => {
  return radian / (Math.PI / 180);
};

export const getRadianFromAngle = (angle: number) => {
  return (Math.PI / 180) * angle;
};
