import { FC } from 'react';

interface WaveStaticSvgProps {
  viewBox: string;
}

export const WaveStaticSvg: FC<WaveStaticSvgProps> = ({ viewBox }) => {
  const [, , width, height] = viewBox.split(' ');

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask-background"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <path d={`M${width} 0H0V${height}H${width}V0Z`} fill="white" />
      </mask>
      <g mask="url(#mask-background)">
        <path
          d={`M${width} 0H0V${height}H${width}V0Z`}
          fill="url(#gradient-background)"
        />
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-58.7036 502.048C-82.8692 497.732 -90.9265 511.552 -118.933 506.55L-212.108 1028.27L2091.44 1439.67L2184.62 917.943C2156.61 912.941 2153.84 897.187 2129.67 892.871C2105.51 888.555 2097.45 902.375 2069.44 897.373C2041.44 892.371 2038.66 876.617 2014.49 872.301C1990.33 867.986 1982.27 881.805 1954.26 876.804C1926.26 871.802 1923.48 856.047 1899.32 851.732C1875.15 847.416 1867.09 861.236 1839.09 856.234C1811.08 851.232 1808.3 835.478 1784.14 831.162C1759.97 826.846 1751.92 840.666 1723.91 835.664C1695.9 830.663 1693.13 814.908 1668.96 810.592C1644.8 806.277 1636.74 820.096 1608.73 815.095C1580.72 810.093 1577.95 794.339 1553.78 790.023C1529.62 785.707 1521.56 799.527 1493.55 794.525C1465.55 789.523 1462.77 773.769 1438.61 769.453C1414.44 765.137 1406.38 778.957 1378.38 773.955C1350.37 768.954 1347.59 753.199 1323.43 748.884C1299.26 744.568 1291.21 758.387 1263.2 753.386C1235.19 748.384 1232.42 732.63 1208.25 728.314C1184.08 723.998 1176.03 737.818 1148.02 732.816C1120.01 727.814 1117.24 712.06 1093.07 707.744C1068.91 703.429 1060.85 717.248 1032.84 712.246C1004.84 707.245 1002.06 691.49 977.895 687.175C953.73 682.859 945.672 696.679 917.666 691.677C889.659 686.675 886.883 670.921 862.718 666.605C838.552 662.289 830.495 676.109 802.488 671.107C774.481 666.106 771.706 650.351 747.54 646.035C723.374 641.72 715.317 655.539 687.31 650.538C659.304 645.536 656.528 629.782 632.362 625.466C608.197 621.15 600.139 634.97 572.133 629.968C544.126 624.966 541.35 609.212 517.185 604.896C493.019 600.58 484.962 614.4 456.955 609.398C428.948 604.397 426.173 588.642 402.007 584.327C377.841 580.011 369.784 593.83 341.777 588.829C313.771 583.827 310.995 568.073 286.829 563.757C262.664 559.441 254.606 573.261 226.6 568.259C198.593 563.257 195.817 547.503 171.652 543.187C147.486 538.872 139.429 552.691 111.422 547.689C83.4154 542.688 80.6397 526.933 56.4741 522.618C32.3085 518.302 24.2512 532.122 -3.75555 527.12C-31.7622 522.118 -34.5379 506.364 -58.7036 502.048Z"
            fill="url(#gradient-layer-1)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-124.907 540C-100.228 544.407 -97.4429 560.135 -69.9049 565.053C-41.3817 570.147 -33.8172 556.268 -9.63089 560.587C14.5554 564.907 17.3405 580.635 45.3712 585.641C73.4018 590.647 81.4589 576.855 105.645 581.174C129.831 585.494 132.617 601.222 160.647 606.228C188.678 611.234 196.735 597.442 220.921 601.762C245.107 606.081 247.893 621.809 275.923 626.815C303.954 631.821 312.011 618.029 336.197 622.349C360.384 626.668 363.169 642.396 391.199 647.402C419.23 652.408 427.287 638.617 451.473 642.936C475.66 647.255 478.445 662.984 506.475 667.99C534.506 672.996 542.563 659.204 566.749 663.523C590.936 667.843 593.721 683.571 621.752 688.577C649.782 693.583 657.839 679.791 682.026 684.11C706.212 688.43 708.997 704.158 737.028 709.164C765.058 714.17 773.115 700.378 797.302 704.698C821.488 709.017 824.273 724.745 852.304 729.751C880.334 734.757 888.391 720.965 912.578 725.285C936.764 729.604 939.549 745.332 967.58 750.338C995.61 755.344 1003.67 741.553 1027.85 745.872C1052.04 750.192 1054.83 765.92 1082.86 770.926C1110.89 775.932 1118.94 762.14 1143.13 766.459C1167.32 770.779 1170.1 786.507 1198.13 791.513C1226.16 796.519 1234.22 782.727 1258.41 787.047C1282.59 791.366 1285.38 807.094 1313.41 812.1C1341.44 817.106 1349.5 803.314 1373.68 807.634C1397.87 811.953 1400.65 827.681 1428.68 832.687C1456.71 837.693 1464.77 823.902 1488.96 828.221C1513.14 832.54 1515.93 848.268 1543.96 853.274C1571.99 858.28 1580.05 844.489 1604.23 848.808C1628.42 853.128 1631.21 868.856 1659.24 873.862C1687.27 878.868 1695.32 865.076 1719.51 869.395C1743.7 873.715 1746.48 889.443 1774.51 894.449C1802.54 899.455 1810.6 885.663 1834.79 889.983C1858.97 894.302 1861.76 910.03 1889.79 915.036C1917.82 920.042 1925.88 906.25 1950.06 910.57C1974.25 914.889 1977.03 930.617 2005.06 935.623C2033.1 940.629 2041.15 926.838 2065.34 931.157C2089.52 935.476 2092.31 951.205 2120.34 956.21C2148.37 961.216 2156.43 947.425 2180.61 951.744L2084.97 1487.27L-220.547 1075.53L-124.907 540Z"
            fill="url(#gradient-layer-2)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-75.9328 598.522C-100.099 594.206 -108.156 608.026 -136.163 603.024L-229.338 1124.75L2074.22 1536.14L2167.39 1014.42C2139.38 1009.41 2136.61 993.66 2112.44 989.345C2088.28 985.029 2080.22 998.849 2052.21 993.847C2024.21 988.845 2021.43 973.091 1997.26 968.775C1973.1 964.459 1965.04 978.279 1937.04 973.277C1909.03 968.275 1906.25 952.521 1882.09 948.205C1857.92 943.89 1849.86 957.709 1821.86 952.708C1793.85 947.706 1791.08 931.951 1766.91 927.636C1742.74 923.32 1734.69 937.14 1706.68 932.138C1678.67 927.136 1675.9 911.382 1651.73 907.066C1627.57 902.75 1619.51 916.57 1591.5 911.568C1563.5 906.567 1560.72 890.812 1536.55 886.496C1512.39 882.181 1504.33 896 1476.32 890.999C1448.32 885.997 1445.54 870.243 1421.38 865.927C1397.21 861.611 1389.15 875.431 1361.15 870.429C1333.14 865.427 1330.36 849.673 1306.2 845.357C1282.03 841.041 1273.98 854.861 1245.97 849.859C1217.96 844.858 1215.19 829.103 1191.02 824.788C1166.86 820.472 1158.8 834.291 1130.79 829.29C1102.78 824.288 1100.01 808.534 1075.84 804.218C1051.68 799.902 1043.62 813.722 1015.61 808.72C987.607 803.718 984.832 787.964 960.666 783.648C936.5 779.333 928.443 793.152 900.436 788.15C872.43 783.149 869.654 767.394 845.488 763.079C821.323 758.763 813.265 772.583 785.259 767.581C757.252 762.579 754.476 746.825 730.311 742.509C706.145 738.193 698.088 752.013 670.081 747.011C642.074 742.01 639.299 726.255 615.133 721.939C590.967 717.624 582.91 731.443 554.903 726.442C526.897 721.44 524.121 705.686 499.955 701.37C475.79 697.054 467.732 710.874 439.726 705.872C411.719 700.87 408.943 685.116 384.778 680.8C360.612 676.484 352.555 690.304 324.548 685.302C296.541 680.301 293.766 664.546 269.6 660.231C245.434 655.915 237.377 669.734 209.37 664.733C181.364 659.731 178.588 643.977 154.422 639.661C130.257 635.345 122.199 649.165 94.1929 644.163C66.1861 639.161 63.4105 623.407 39.2448 619.091C15.0792 614.776 7.02192 628.595 -20.9848 623.593C-48.9915 618.592 -51.7672 602.837 -75.9328 598.522Z"
            fill="url(#gradient-layer-3)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-142.136 636.474C-117.457 640.881 -114.672 656.609 -87.1342 661.527C-58.6109 666.621 -51.0464 652.741 -26.8602 657.061C-2.67387 661.38 0.111279 677.108 28.1419 682.114C56.1726 687.12 64.2297 673.328 88.4159 677.648C112.602 681.967 115.387 697.695 143.418 702.701C171.449 707.707 179.506 693.916 203.692 698.235C227.878 702.555 230.663 718.283 258.694 723.289C286.725 728.295 294.782 714.503 318.968 718.822C343.154 723.142 345.939 738.87 373.97 743.876C402.001 748.882 410.058 735.09 434.244 739.41C458.43 743.729 461.216 759.457 489.246 764.463C517.277 769.469 525.334 755.677 549.52 759.997C573.707 764.316 576.492 780.044 604.522 785.05C632.553 790.056 640.61 776.265 664.796 780.584C688.983 784.903 691.768 800.631 719.798 805.637C747.829 810.643 755.886 796.852 780.072 801.171C804.259 805.491 807.044 821.219 835.074 826.225C863.105 831.231 871.162 817.439 895.348 821.758C919.535 826.078 922.32 841.806 950.351 846.812C978.381 851.818 986.438 838.026 1010.62 842.346C1034.81 846.665 1037.6 862.393 1065.63 867.399C1093.66 872.405 1101.71 858.613 1125.9 862.933C1150.09 867.252 1152.87 882.98 1180.9 887.986C1208.93 892.992 1216.99 879.201 1241.18 883.52C1265.36 887.839 1268.15 903.568 1296.18 908.574C1324.21 913.58 1332.27 899.788 1356.45 904.107C1380.64 908.427 1383.42 924.155 1411.46 929.161C1439.49 934.167 1447.54 920.375 1471.73 924.694C1495.92 929.014 1498.7 944.742 1526.73 949.748C1554.76 954.754 1562.82 940.962 1587.01 945.282C1611.19 949.601 1613.98 965.329 1642.01 970.335C1670.04 975.341 1678.09 961.549 1702.28 965.869C1726.47 970.188 1729.25 985.916 1757.28 990.922C1785.31 995.928 1793.37 982.137 1817.56 986.456C1841.74 990.776 1844.53 1006.5 1872.56 1011.51C1900.59 1016.52 1908.65 1002.72 1932.83 1007.04C1957.02 1011.36 1959.8 1027.09 1987.84 1032.1C2015.87 1037.1 2023.92 1023.31 2048.11 1027.63C2072.3 1031.95 2075.08 1047.68 2103.11 1052.68C2131.14 1057.69 2139.2 1043.9 2163.39 1048.22L2067.75 1583.74L-237.776 1172L-142.136 636.474Z"
            fill="url(#gradient-layer-4)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-93.1621 694.995C-117.328 690.679 -125.385 704.499 -153.392 699.497L-246.567 1221.22L2056.99 1632.61L2150.16 1110.89C2122.15 1105.89 2119.38 1090.13 2095.21 1085.82C2071.05 1081.5 2062.99 1095.32 2034.98 1090.32C2006.98 1085.32 2004.2 1069.56 1980.04 1065.25C1955.87 1060.93 1947.81 1074.75 1919.81 1069.75C1891.8 1064.75 1889.02 1048.99 1864.86 1044.68C1840.69 1040.36 1832.63 1054.18 1804.63 1049.18C1776.62 1044.18 1773.85 1028.42 1749.68 1024.11C1725.51 1019.79 1717.46 1033.61 1689.45 1028.61C1661.44 1023.61 1658.67 1007.86 1634.5 1003.54C1610.34 999.224 1602.28 1013.04 1574.27 1008.04C1546.27 1003.04 1543.49 987.286 1519.32 982.97C1495.16 978.654 1487.1 992.474 1459.1 987.472C1431.09 982.47 1428.31 966.716 1404.15 962.4C1379.98 958.085 1371.92 971.904 1343.92 966.903C1315.91 961.901 1313.14 946.146 1288.97 941.831C1264.8 937.515 1256.75 951.335 1228.74 946.333C1200.73 941.331 1197.96 925.577 1173.79 921.261C1149.63 916.945 1141.57 930.765 1113.56 925.763C1085.56 920.762 1082.78 905.007 1058.61 900.691C1034.45 896.376 1026.39 910.195 998.385 905.194C970.378 900.192 967.602 884.438 943.437 880.122C919.271 875.806 911.214 889.626 883.207 884.624C855.2 879.622 852.425 863.868 828.259 859.552C804.093 855.236 796.036 869.056 768.029 864.054C740.023 859.053 737.247 843.298 713.081 838.983C688.916 834.667 680.858 848.486 652.852 843.485C624.845 838.483 622.069 822.729 597.904 818.413C573.738 814.097 565.681 827.917 537.674 822.915C509.667 817.913 506.892 802.159 482.726 797.843C458.56 793.528 450.503 807.347 422.496 802.345C394.49 797.344 391.714 781.589 367.548 777.274C343.383 772.958 335.326 786.778 307.319 781.776C279.312 776.774 276.536 761.02 252.371 756.704C228.205 752.388 220.148 766.208 192.141 761.206C164.134 756.204 161.359 740.45 137.193 736.134C113.028 731.819 104.97 745.638 76.9636 740.637C48.9569 735.635 46.1812 719.881 22.0156 715.565C-2.15001 711.249 -10.2073 725.069 -38.214 720.067C-66.2207 715.065 -68.9964 699.311 -93.1621 694.995Z"
            fill="url(#gradient-layer-5)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-159.366 732.947C-134.687 737.355 -131.902 753.083 -104.364 758.001C-75.8402 763.095 -68.2757 749.215 -44.0894 753.534C-19.9031 757.854 -17.118 773.582 10.9128 778.588C38.9433 783.594 47.0004 769.802 71.1867 774.122C95.373 778.441 98.1581 794.169 126.189 799.175C154.219 804.181 162.276 790.389 186.463 794.709C210.649 799.028 213.434 814.756 241.465 819.762C269.495 824.768 277.553 810.977 301.739 815.296C325.925 819.615 328.71 835.343 356.741 840.349C384.771 845.355 392.829 831.564 417.015 835.883C441.201 840.203 443.986 855.931 472.017 860.937C500.048 865.943 508.105 852.151 532.291 856.47C556.477 860.79 559.262 876.518 587.293 881.524C615.324 886.53 623.381 872.738 647.567 877.058C671.753 881.377 674.538 897.105 702.569 902.111C730.6 907.117 738.657 893.325 762.843 897.645C787.029 901.964 789.815 917.692 817.845 922.698C845.876 927.704 853.933 913.913 878.119 918.232C902.306 922.551 905.091 938.28 933.121 943.286C961.152 948.292 969.209 934.5 993.395 938.819C1017.58 943.139 1020.37 958.867 1048.4 963.873C1076.43 968.879 1084.49 955.087 1108.67 959.406C1132.86 963.726 1135.64 979.454 1163.67 984.46C1191.7 989.466 1199.76 975.674 1223.95 979.994C1248.13 984.313 1250.92 1000.04 1278.95 1005.05C1306.98 1010.05 1315.04 996.261 1339.22 1000.58C1363.41 1004.9 1366.2 1020.63 1394.23 1025.63C1422.26 1030.64 1430.31 1016.85 1454.5 1021.17C1478.69 1025.49 1481.47 1041.22 1509.5 1046.22C1537.53 1051.23 1545.59 1037.44 1569.78 1041.76C1593.96 1046.07 1596.75 1061.8 1624.78 1066.81C1652.81 1071.81 1660.87 1058.02 1685.05 1062.34C1709.24 1066.66 1712.02 1082.39 1740.05 1087.4C1768.08 1092.4 1776.14 1078.61 1800.33 1082.93C1824.51 1087.25 1827.3 1102.98 1855.33 1107.98C1883.36 1112.99 1891.42 1099.2 1915.6 1103.52C1939.79 1107.84 1942.58 1123.56 1970.61 1128.57C1998.64 1133.58 2006.69 1119.78 2030.88 1124.1C2055.07 1128.42 2057.85 1144.15 2085.88 1149.16C2113.91 1154.16 2121.97 1140.37 2146.16 1144.69L2050.52 1680.22L-255.006 1268.47L-159.366 732.947Z"
            fill="url(#gradient-layer-6)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-110.391 791.469C-134.557 787.153 -142.614 800.973 -170.621 795.971L-263.796 1317.7L2039.76 1729.09L2132.93 1207.36C2104.93 1202.36 2102.15 1186.61 2077.98 1182.29C2053.82 1177.98 2045.76 1191.8 2017.75 1186.79C1989.75 1181.79 1986.97 1166.04 1962.81 1161.72C1938.64 1157.41 1930.58 1171.23 1902.58 1166.22C1874.57 1161.22 1871.79 1145.47 1847.63 1141.15C1823.46 1136.84 1815.41 1150.66 1787.4 1145.65C1759.39 1140.65 1756.62 1124.9 1732.45 1120.58C1708.29 1116.27 1700.23 1130.09 1672.22 1125.09C1644.21 1120.08 1641.44 1104.33 1617.27 1100.01C1593.11 1095.7 1585.05 1109.52 1557.04 1104.52C1529.04 1099.51 1526.26 1083.76 1502.1 1079.44C1477.93 1075.13 1469.87 1088.95 1441.87 1083.95C1413.86 1078.94 1411.08 1063.19 1386.92 1058.87C1362.75 1054.56 1354.7 1068.38 1326.69 1063.38C1298.68 1058.37 1295.91 1042.62 1271.74 1038.3C1247.57 1033.99 1239.52 1047.81 1211.51 1042.81C1183.5 1037.8 1180.73 1022.05 1156.56 1017.73C1132.4 1013.42 1124.34 1027.24 1096.33 1022.24C1068.33 1017.24 1065.55 1001.48 1041.39 997.165C1017.22 992.849 1009.16 1006.67 981.155 1001.67C953.149 996.666 950.373 980.911 926.207 976.595C902.042 972.28 893.985 986.099 865.978 981.098C837.971 976.096 835.195 960.342 811.03 956.026C786.864 951.71 778.807 965.53 750.8 960.528C722.793 955.526 720.018 939.772 695.852 935.456C671.687 931.14 663.629 944.96 635.623 939.958C607.616 934.957 604.84 919.202 580.674 914.887C556.509 910.571 548.452 924.39 520.445 919.389C492.438 914.387 489.662 898.633 465.497 894.317C441.331 890.001 433.274 903.821 405.267 898.819C377.26 893.817 374.485 878.063 350.319 873.747C326.154 869.432 318.096 883.251 290.09 878.249C262.083 873.248 259.307 857.493 235.142 853.178C210.976 848.862 202.919 862.682 174.912 857.68C146.905 852.678 144.13 836.924 119.964 832.608C95.7979 828.292 87.7406 842.112 59.7339 837.11C31.7272 832.108 28.9515 816.354 4.78586 812.038C-19.3798 807.723 -27.4371 821.542 -55.4438 816.541C-83.4505 811.539 -86.2262 795.785 -110.391 791.469Z"
            fill="url(#gradient-layer-7)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-176.595 829.421C-151.916 833.828 -149.131 849.556 -121.593 854.474C-93.0694 859.568 -85.5049 845.689 -61.3187 850.008C-37.1324 854.327 -34.3472 870.055 -6.31656 875.061C21.7141 880.067 29.7712 866.276 53.9574 870.595C78.1437 874.915 80.9289 890.643 108.959 895.649C136.99 900.655 145.047 886.863 169.233 891.182C193.42 895.502 196.205 911.23 224.236 916.236C252.266 921.242 260.323 907.45 284.51 911.77C308.696 916.089 311.481 931.817 339.512 936.823C367.542 941.829 375.599 928.037 399.786 932.357C423.972 936.676 426.757 952.404 454.788 957.41C482.818 962.416 490.875 948.625 515.062 952.944C539.248 957.263 542.033 972.992 570.064 977.998C598.094 983.004 606.152 969.212 630.338 973.531C654.524 977.851 657.309 993.579 685.34 998.585C713.371 1003.59 721.428 989.799 745.614 994.118C769.8 998.438 772.585 1014.17 800.616 1019.17C828.647 1024.18 836.704 1010.39 860.89 1014.71C885.076 1019.03 887.861 1034.75 915.892 1039.76C943.923 1044.77 951.98 1030.97 976.166 1035.29C1000.35 1039.61 1003.14 1055.34 1031.17 1060.35C1059.2 1065.35 1067.26 1051.56 1091.44 1055.88C1115.63 1060.2 1118.41 1075.93 1146.44 1080.93C1174.47 1085.94 1182.53 1072.15 1206.72 1076.47C1230.9 1080.79 1233.69 1096.51 1261.72 1101.52C1289.75 1106.53 1297.81 1092.74 1321.99 1097.05C1346.18 1101.37 1348.97 1117.1 1377 1122.11C1405.03 1127.11 1413.08 1113.32 1437.27 1117.64C1461.46 1121.96 1464.24 1137.69 1492.27 1142.7C1520.3 1147.7 1528.36 1133.91 1552.55 1138.23C1576.73 1142.55 1579.52 1158.28 1607.55 1163.28C1635.58 1168.29 1643.64 1154.5 1667.82 1158.82C1692.01 1163.14 1694.79 1178.86 1722.82 1183.87C1750.86 1188.88 1758.91 1175.08 1783.1 1179.4C1807.29 1183.72 1810.07 1199.45 1838.1 1204.46C1866.13 1209.46 1874.19 1195.67 1898.37 1199.99C1922.56 1204.31 1925.35 1220.04 1953.38 1225.04C1981.41 1230.05 1989.46 1216.26 2013.65 1220.58C2037.84 1224.9 2040.62 1240.63 2068.65 1245.63C2096.68 1250.64 2104.74 1236.85 2128.93 1241.16L2033.29 1776.69L-272.235 1364.95L-176.595 829.421Z"
            fill="url(#gradient-layer-8)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-127.621 887.942C-151.786 883.627 -159.844 897.446 -187.85 892.444L-281.025 1414.17L2022.53 1825.56L2115.7 1303.84C2087.7 1298.84 2084.92 1283.08 2060.75 1278.77C2036.59 1274.45 2028.53 1288.27 2000.53 1283.27C1972.52 1278.27 1969.74 1262.51 1945.58 1258.2C1921.41 1253.88 1913.35 1267.7 1885.35 1262.7C1857.34 1257.7 1854.56 1241.94 1830.4 1237.63C1806.23 1233.31 1798.18 1247.13 1770.17 1242.13C1742.16 1237.13 1739.39 1221.37 1715.22 1217.06C1691.06 1212.74 1683 1226.56 1654.99 1221.56C1626.99 1216.56 1624.21 1200.8 1600.04 1196.49C1575.88 1192.17 1567.82 1205.99 1539.81 1200.99C1511.81 1195.99 1509.03 1180.23 1484.87 1175.92C1460.7 1171.6 1452.64 1185.42 1424.64 1180.42C1396.63 1175.42 1393.85 1159.66 1369.69 1155.35C1345.52 1151.03 1337.47 1164.85 1309.46 1159.85C1281.45 1154.85 1278.68 1139.09 1254.51 1134.78C1230.35 1130.46 1222.29 1144.28 1194.28 1139.28C1166.27 1134.28 1163.5 1118.52 1139.33 1114.21C1115.17 1109.89 1107.11 1123.71 1079.1 1118.71C1051.1 1113.71 1048.32 1097.95 1024.16 1093.64C999.99 1089.32 991.933 1103.14 963.926 1098.14C935.919 1093.14 933.144 1077.38 908.978 1073.07C884.813 1068.75 876.755 1082.57 848.749 1077.57C820.742 1072.57 817.966 1056.82 793.801 1052.5C769.635 1048.18 761.578 1062 733.571 1057C705.564 1052 702.789 1036.25 678.623 1031.93C654.457 1027.61 646.4 1041.43 618.393 1036.43C590.387 1031.43 587.611 1015.68 563.445 1011.36C539.28 1007.04 531.222 1020.86 503.216 1015.86C475.209 1010.86 472.433 995.106 448.268 990.79C424.102 986.475 416.045 1000.29 388.038 995.293C360.031 990.291 357.256 974.537 333.09 970.221C308.924 965.905 300.867 979.725 272.86 974.723C244.854 969.721 242.078 953.967 217.912 949.651C193.747 945.335 185.689 959.155 157.683 954.153C129.676 949.152 126.9 933.397 102.735 929.082C78.5692 924.766 70.5118 938.585 42.5051 933.584C14.4984 928.582 11.7227 912.828 -12.4429 908.512C-36.6085 904.196 -44.6658 918.016 -72.6725 913.014C-100.679 908.012 -103.455 892.258 -127.621 887.942Z"
            fill="url(#gradient-layer-9)"
          />
        </g>
        <g style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M-193.824 925.894C-169.145 930.302 -166.36 946.03 -138.822 950.948C-110.299 956.042 -102.734 942.162 -78.548 946.481C-54.3618 950.801 -51.5766 966.529 -23.5459 971.535C4.48472 976.541 12.5418 962.749 36.7281 967.069C60.9143 971.388 63.6995 987.116 91.7301 992.122C119.761 997.128 127.818 983.336 152.004 987.656C176.19 991.975 178.975 1007.7 207.006 1012.71C235.037 1017.72 243.094 1003.92 267.28 1008.24C291.466 1012.56 294.252 1028.29 322.282 1033.3C350.313 1038.3 358.37 1024.51 382.556 1028.83C406.743 1033.15 409.528 1048.88 437.558 1053.88C465.589 1058.89 473.646 1045.1 497.832 1049.42C522.019 1053.74 524.804 1069.47 552.834 1074.47C580.865 1079.48 588.922 1065.69 613.108 1070C637.295 1074.32 640.08 1090.05 668.11 1095.06C696.141 1100.06 704.198 1086.27 728.385 1090.59C752.571 1094.91 755.356 1110.64 783.387 1115.65C811.417 1120.65 819.474 1106.86 843.661 1111.18C867.847 1115.5 870.632 1131.23 898.663 1136.23C926.693 1141.24 934.75 1127.45 958.937 1131.77C983.123 1136.09 985.908 1151.81 1013.94 1156.82C1041.97 1161.83 1050.03 1148.03 1074.21 1152.35C1098.4 1156.67 1101.18 1172.4 1129.21 1177.41C1157.25 1182.41 1165.3 1168.62 1189.49 1172.94C1213.68 1177.26 1216.46 1192.99 1244.49 1197.99C1272.52 1203 1280.58 1189.21 1304.77 1193.53C1328.95 1197.85 1331.74 1213.58 1359.77 1218.58C1387.8 1223.59 1395.85 1209.8 1420.04 1214.12C1444.23 1218.43 1447.01 1234.16 1475.04 1239.17C1503.07 1244.17 1511.13 1230.38 1535.32 1234.7C1559.5 1239.02 1562.29 1254.75 1590.32 1259.76C1618.35 1264.76 1626.41 1250.97 1650.59 1255.29C1674.78 1259.61 1677.56 1275.34 1705.6 1280.34C1733.63 1285.35 1741.68 1271.56 1765.87 1275.88C1790.06 1280.2 1792.84 1295.92 1820.87 1300.93C1848.9 1305.94 1856.96 1292.14 1881.15 1296.46C1905.33 1300.78 1908.12 1316.51 1936.15 1321.52C1964.18 1326.52 1972.24 1312.73 1996.42 1317.05C2020.61 1321.37 2023.39 1337.1 2051.42 1342.1C2079.45 1347.11 2087.51 1333.32 2111.7 1337.64L2016.06 1873.17L-289.464 1461.42L-193.824 925.894Z"
            fill="url(#gradient-layer-10)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="gradient-background"
          x1="960"
          y1="0"
          x2="960"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#407577" />
          <stop offset="1" stopColor="#77D9DD" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-1"
          x1="1035.48"
          y1="697.459"
          x2="939.668"
          y2="1233.97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-2"
          x1="1027.85"
          y1="745.872"
          x2="932.214"
          y2="1281.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-3"
          x1="1018.25"
          y1="793.933"
          x2="922.439"
          y2="1330.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-4"
          x1="1010.62"
          y1="842.346"
          x2="914.985"
          y2="1377.87"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-5"
          x1="1001.03"
          y1="890.407"
          x2="905.21"
          y2="1426.92"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-6"
          x1="993.395"
          y1="938.819"
          x2="897.755"
          y2="1474.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-7"
          x1="983.795"
          y1="986.88"
          x2="887.979"
          y2="1523.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-8"
          x1="976.166"
          y1="1035.29"
          x2="880.526"
          y2="1570.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-9"
          x1="966.567"
          y1="1083.35"
          x2="870.751"
          y2="1619.87"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
        <linearGradient
          id="gradient-layer-10"
          x1="958.937"
          y1="1131.77"
          x2="863.297"
          y2="1667.29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2C6C7" />
          <stop offset="1" stopColor="#6FB7BC" />
        </linearGradient>
      </defs>
    </svg>
  );
};