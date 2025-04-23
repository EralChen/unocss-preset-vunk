Flex容器(AMCSS)

  使用[sk-flex]为属性命名空间

  该规则将flexbox常用属性分成三段 ①-②-③

  ①、主副轴方向（flex-direction）
    col: column; row: row

  ②、主轴方向布局（justify-content）
    可忽略, 即为默认；
    center: center;
    between: space-between;
    around: space-around;
    end: flex-end;

  ③、副轴方向布局（align-items）
    可忽略, 即为默认；
    center: center;
    start: start;
    end: flex-end;
    baseline: baseline;


  尾部属性不设置, 属性值为 ① 或 ①-②；

  中间属性不设置, -②-用占位符_表示 ,属性值为 ①_②；

  ②、③属性相同, 属性值为①-②2
