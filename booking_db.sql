-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2024 at 02:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `seating_capacity` int(11) NOT NULL,
  `route` varchar(255) NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_time` time NOT NULL,
  `fare` int(10) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`id`, `name`, `number`, `type`, `seating_capacity`, `route`, `departure_time`, `arrival_time`, `fare`, `image`) VALUES
(1, 'kuii', '77778888', 'kololl', 7, 'jum to ukkk', '15:53:00', '19:53:00', NULL, '1722846405250.jpeg'),
(2, 'kuii', '77778888', 'kololl', 7, 'jum to ukkk', '15:53:00', '19:53:00', NULL, '1722847407286.jpeg'),
(3, 'jjj', '555757', 'khkk', 6, 'jghkhjhj to ', '18:13:00', '18:13:00', NULL, '1722847432680.jpeg'),
(4, 'jihj', 'jjj', 'jjnj', 45, 'ghh to hjj', '19:12:00', '21:12:00', NULL, '1723027388208.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `address`, `city`, `state`, `zip`, `phone`, `email`, `image`) VALUES
(1, 'hotel', 'hjgjg', 'raigarh', 'chatisgarh', '4446577', '5765656565', 'm@gmail.com', '1722844531198.jpeg'),
(2, 'jhyuj', 'uuy', 'uuu', 'uuk', '777777', '7755578787', 'm@phj.gmail.com', '1722846172589.jpeg'),
(3, 'yuyu', 'yghghg', 'ghghfhg', 'ytyutt', '454545', '888898989', 'mdfftf@gfg.com', '1723024656999.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `mobile`, `email`, `password`, `created_at`) VALUES
(1, 'kukuhk', '7878787878', 'msh@gmail.com', '$2b$10$GoEQB8ycBIyjxKG6cnocb.Oofr7ke1Od4Wn7EdyZOM1Ll.T2071Oe', '2024-07-19 10:46:28'),
(2, 'mshpatel', '9575997552', 'mshpatel@gmail.com', '$2b$10$.8ig/Dzk5FmQtlD7ql4.R.M0x23pLMDix3PMymy90ukGKvZJ5x8wG', '2024-07-19 11:38:09'),
(3, 'jhkjh', '6767676767', 'm@gmail.com', '$2b$10$VEleCn0NbLqG085c.0d4UOvHdyf3to8x7W2FSSfmbfBFMIflp4AIu', '2024-07-19 11:45:01'),
(4, 'errtrt', '3434343434', 'm@gmail.com', '$2b$10$.T6CcqrsUXpP6F4BF7.xg.82mrs9cWya2iie728tpEP/5Vp1bT8pe', '2024-07-19 11:46:00'),
(5, 'atik', '8787878787', 'm@hmail.com', '$2b$10$GsAplLIJxeBW1UIVEGAoOOBrhy6cPmZ0Ttas0ji0VVM9kP157SzLm', '2024-07-26 07:18:09'),
(6, 'tjhhgjhjh', '6789898989', 'm@gmail.com', '$2b$10$d7d6puL9ZMk3PjJ8mlrv3.3gTE6AoTR/68rCLEadUzWoQb.RBUfkW', '2024-08-07 09:22:24'),
(7, 'tjhhgjhjh', '6789898989', 'm@gmail.com', '$2b$10$/IZjeAsIdztSVEwf7t3ws.gLs92yo9XM.jrmxUvi8oDr9sCp6CpPa', '2024-08-07 09:22:25'),
(8, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$.IKcNQ72dBDUGgoZNmJIN.FQJXnywXnSa4Yu7uBT302tF9oC67Hc.', '2024-08-07 09:22:56'),
(9, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$AXTUwSmbcbycSftgA6K3OOg/SPNSOF8XPxUdOKQHHZSxEZpDBNJge', '2024-08-07 09:22:57'),
(10, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$X2AiNg0Gy/JbCqqSJiSNUuQnbTaXLFs9Cg.8Ml9epnUYkFcGIgdtq', '2024-08-07 09:22:57'),
(11, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$c5CPXYaPPoNpe0mjY/UgKuQDemP29swMbe2a5l8Z.fP1x.4F5rIty', '2024-08-07 09:22:57'),
(12, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$SjsQxgmFvXqvFfY2Rv8U6.FGqOwyKTg3znz4NyWmYzihcFaTFVUUi', '2024-08-07 09:22:58'),
(13, '6u7uuu', '9898979876', 'msh@gmail.com', '$2b$10$jOvvsSzwMhAPfPorwaRr1uJVQ3GELSQgsGsPu/FKljDwxBWED78uK', '2024-08-07 09:22:58'),
(14, '6u7uuu', '9898979876', 'msh1233@gmail.com', '$2b$10$aZ8MeEd.XOQZDTPtAMJipuZBZUcr9DGgCRmcVwy2nHVZzAaNJP77q', '2024-08-07 09:23:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
