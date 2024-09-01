-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2024 at 07:07 AM
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
-- Table structure for table `boarding_dropping_points`
--

CREATE TABLE `boarding_dropping_points` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `point_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `time` time DEFAULT NULL,
  `type` enum('Boarding','Dropping') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boarding_dropping_points`
--

INSERT INTO `boarding_dropping_points` (`id`, `bus_id`, `point_name`, `address`, `time`, `type`) VALUES
(1, 2, NULL, NULL, NULL, 'Dropping'),
(2, 2, 'ddd', 'wedewdc', '01:50:00', 'Dropping'),
(3, 1, 'bilapur', 'old bus stand', '03:17:00', 'Dropping');

-- --------------------------------------------------------

--
-- Table structure for table `booking_policies`
--

CREATE TABLE `booking_policies` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `policy_title` varchar(255) DEFAULT NULL,
  `policy_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_policies`
--

INSERT INTO `booking_policies` (`id`, `bus_id`, `policy_title`, `policy_description`) VALUES
(1, 1, 'dcdscs', 'bxncxssxcnsxnsxc'),
(2, 3, 'dcdscs', 'ty64'),
(3, 1, 'policy', 'Child passenger policy\nChildren above the age of 5 will need a ticket\n\nLuggage policy\n3 pieces of luggage will be accepted free of charge per passenger. Excess items will be chargeable\nExcess baggage over 15 kgs per passenger will be chargeable\n\nPets Policy\nPets are not allowed\n\nLiquor Policy\nCarrying or consuming liquor inside the bus is prohibited. Bus operator reserves the right to deboard drunk passengers.\n\nPick up time policy\nBus operator is not obligated to wait beyond the scheduled departure time of the bus. No refund request will be entertained for late arriving passengers.');

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `seating_capacity` int(11) NOT NULL,
  `route` varchar(255) NOT NULL,
  `start_location` varchar(255) NOT NULL,
  `end_location` varchar(255) NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_time` time NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `fare` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`id`, `name`, `number`, `type`, `seating_capacity`, `route`, `start_location`, `end_location`, `departure_time`, `arrival_time`, `image`, `fare`, `created_at`, `updated_at`) VALUES
(1, 'RAJDHANI', 'RAJ120', 'DEASEL', 30, 'BILASPUR TO RAIGARH', 'BILASPUR', 'RAIGARH', '01:32:00', '02:32:00', '1723313040846.jpg', 1000.00, '2024-08-10 18:04:01', '2024-08-10 18:04:01'),
(2, 'BADAN', 'BAD439', 'DEASEL', 30, 'RAIGARH TO SARANGARH', 'RAIGARH', 'SARANGARH', '01:05:00', '03:06:00', '1723397788468.jpg', 500.00, '2024-08-11 17:36:28', '2024-08-11 17:36:28'),
(3, 'Travels', 'Bus 101', 'Both', 30, 'bilaspur to raigarh', 'bilaspur', 'raigarh', '04:25:00', '05:25:00', '1723492527156.jpg', 1000.00, '2024-08-12 19:55:27', '2024-08-12 19:55:27'),
(4, 'VASHUDEV', 'VAS312', 'ELECTRIC', 50, 'BILASPUR, SARANGARH, RAIGARH', 'BILASPUR', 'RAIGARH', '02:43:00', '04:43:00', '1723832123361.jpg', 1000.00, '2024-08-16 18:15:23', '2024-08-16 18:15:23'),
(5, 'city', 'vfrf', 'tgtgr', 23, 'vgvt', 'ggu', 'obs', '23:37:00', '02:37:00', '1724346472831.jpg', 1000.00, '2024-08-22 17:07:52', '2024-08-22 17:07:52'),
(6, 'Maharaja', 'maha123', 'deasel', 1, '1', '1', '2', '19:35:00', '17:39:00', '1724501161601.jpg', 200.00, '2024-08-24 12:06:01', '2024-08-24 12:06:01'),
(7, 'rgghnrgfnrg', 'nfnfn', 'fgnfgn', 12, 'wegerg', 'dffd', 'dfbdf', '03:47:00', '04:53:00', '1724606267571.jpg', 3555.00, '2024-08-25 17:17:47', '2024-08-25 17:17:47'),
(8, 'thtnby', 'yhbbybnb', '6nb6', 6, 'n6nt', 'tyybyt', 'tnbtynb', '02:04:00', '02:04:00', '1724607312742.jpg', 6677.00, '2024-08-25 17:35:12', '2024-08-25 17:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `bus_amenities`
--

CREATE TABLE `bus_amenities` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `amenity_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `amenity_type` varchar(100) DEFAULT NULL,
  `amenity_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_amenities`
--

INSERT INTO `bus_amenities` (`id`, `bus_id`, `amenity_name`, `description`, `amenity_type`, `amenity_image`) VALUES
(1, 2, '6y65hy5hj', 'acdcc', 'dscdscdc', '1724690709429.jpg'),
(2, 1, 'AC', 'Ac services', 'bus', '1725126479292.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bus_reviews`
--

CREATE TABLE `bus_reviews` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `review_text` text DEFAULT NULL,
  `review_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_reviews`
--

INSERT INTO `bus_reviews` (`id`, `bus_id`, `customer_name`, `rating`, `review_text`, `review_date`) VALUES
(1, 2, 'erghef', 5, 'tgrghrh', '2024-08-28'),
(2, 1, 'ramesh', 5, 'good service', '2024-08-28');

-- --------------------------------------------------------

--
-- Table structure for table `bus_seats`
--

CREATE TABLE `bus_seats` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `seat_number` varchar(10) DEFAULT NULL,
  `deck` enum('Lower','Upper') DEFAULT NULL,
  `is_booked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_seats`
--

INSERT INTO `bus_seats` (`id`, `bus_id`, `seat_number`, `deck`, `is_booked`) VALUES
(1, 1, '1', 'Upper', 0),
(2, 2, '101', 'Lower', 0),
(3, 1, '2', 'Upper', 0),
(4, 1, '303', 'Lower', 0),
(6, 1, '4', 'Upper', 0),
(7, 1, '5', 'Upper', 0),
(9, 1, '6', 'Upper', 0),
(10, 1, '7', 'Upper', 0),
(11, 1, '8', 'Upper', 0),
(12, 1, '9', 'Upper', 0),
(13, 1, '11', 'Upper', 0),
(14, 1, '12', 'Upper', 0),
(15, 1, '13', 'Upper', 0),
(16, 1, '15', 'Upper', 0),
(17, 1, '1001', 'Lower', 0),
(19, 1, '17', 'Upper', 0),
(20, 1, '18', 'Upper', 0);

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
-- Indexes for table `boarding_dropping_points`
--
ALTER TABLE `boarding_dropping_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bus_id` (`bus_id`);

--
-- Indexes for table `booking_policies`
--
ALTER TABLE `booking_policies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bus_id` (`bus_id`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `bus_amenities`
--
ALTER TABLE `bus_amenities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bus_id` (`bus_id`);

--
-- Indexes for table `bus_reviews`
--
ALTER TABLE `bus_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bus_id` (`bus_id`);

--
-- Indexes for table `bus_seats`
--
ALTER TABLE `bus_seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bus_id` (`bus_id`);

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
-- AUTO_INCREMENT for table `boarding_dropping_points`
--
ALTER TABLE `boarding_dropping_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_policies`
--
ALTER TABLE `booking_policies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bus_amenities`
--
ALTER TABLE `bus_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bus_reviews`
--
ALTER TABLE `bus_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bus_seats`
--
ALTER TABLE `bus_seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boarding_dropping_points`
--
ALTER TABLE `boarding_dropping_points`
  ADD CONSTRAINT `boarding_dropping_points_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`);

--
-- Constraints for table `booking_policies`
--
ALTER TABLE `booking_policies`
  ADD CONSTRAINT `booking_policies_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`);

--
-- Constraints for table `bus_amenities`
--
ALTER TABLE `bus_amenities`
  ADD CONSTRAINT `bus_amenities_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_reviews`
--
ALTER TABLE `bus_reviews`
  ADD CONSTRAINT `bus_reviews_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`);

--
-- Constraints for table `bus_seats`
--
ALTER TABLE `bus_seats`
  ADD CONSTRAINT `bus_seats_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
