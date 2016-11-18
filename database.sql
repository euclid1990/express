-- phpMyAdmin SQL Dump
-- version 4.6.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 18, 2016 at 02:36 AM
-- Server version: 5.7.12-0ubuntu1
-- PHP Version: 5.6.22-4+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expressjs`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'U',
  `status` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'I',
  `about` text COLLATE utf8_unicode_ci,
  `active_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `auth_token` text COLLATE utf8_unicode_ci,
  `password_changed_at` datetime DEFAULT NULL,
  `logged_in_at` datetime DEFAULT NULL,
  `logged_out_at` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `avatar`, `email`, `password`, `birthday`, `phone`, `gender`, `status`, `about`, `active_token`, `remember_token`, `auth_token`, `password_changed_at`, `logged_in_at`, `logged_out_at`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Whitney Weimann', 'liza64', NULL, 'williamson.tod@example.com', '$2y$10$KzlOu1gtYDgoW3RUH4F9LuT7X6TiHog67RedRZCJy/rJibdl7yu/C', '1990-11-28', NULL, 'U', 'I', 'Ut explicabo sed voluptas.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:01', '2016-11-16 01:44:01'),
(2, 'Dr. Eloise Bashirian III', 'noemy.schulist', NULL, 'winona88@example.org', '$2y$10$NXxtf.X4xGmKOU.AG1B5OudEokL2DDY0MMyc70nbtAYJ6GkSTBwHK', '1992-12-08', NULL, 'U', 'I', 'Enim quae asperiores sed natus vel.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:01', '2016-11-16 01:44:01'),
(3, 'Nasir Bins', 'celine.nicolas', NULL, 'wilburn14@example.com', '$2y$10$a61SiuWjX8HXleMDz9/NwOE2UsbvW.lKZT.gN.DwjYshAIWG5ByzC', '1929-06-28', NULL, 'U', 'I', 'Eius vel amet non repellat.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:01', '2016-11-16 01:44:01'),
(4, 'Dr. Maymie Langosh', 'delia84', NULL, 'conner.crooks@example.com', '$2y$10$A3/76HzxRNpFCRKd/eMokeVQ.T1ZUGp93OGNKIvcJs2BmXjxBlocW', '1972-09-02', NULL, 'U', 'I', 'Ut vero omnis quo labore distinctio.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:02', '2016-11-16 01:44:02'),
(5, 'Lilly Reinger', 'ybechtelar', NULL, 'cruickshank.diana@example.net', '$2y$10$JVs6fvJG79/RsvLkbVTu..m.3Oraj3TQx7JzVXlLoQZHL8hh3QcP6', '1967-02-01', NULL, 'U', 'I', 'Rem molestiae et quia deleniti labore repellendus soluta beatae.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:02', '2016-11-16 01:44:02'),
(6, 'Jerrold Moen', 'zfeeney', NULL, 'ethel.grady@example.net', '$2y$10$3Ed8cqbpqt0h72Q7KJPsLOA46UGdritqpRl5K1DbcFPkBNrcjxJTi', '1963-09-15', NULL, 'U', 'I', 'Ducimus iure ratione delectus et non molestiae sunt.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:02', '2016-11-16 01:44:02'),
(7, 'Dr. Columbus Larkin', 'hamill.agustina', NULL, 'green.ruby@example.net', '$2y$10$oHqGM3TlzpcKhwVhqikruuei5NHfVS7R/Y7SHU0eiFBn2Fx5roj7i', '2009-04-22', NULL, 'U', 'I', 'Et possimus quas voluptatem quasi velit modi.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:02', '2016-11-16 01:44:02'),
(8, 'Ned Streich', 'reinger.lela', NULL, 'doyle.brenden@example.net', '$2y$10$WuwR0KYEtnbrXd9R3rDDkuidLJ4i7.PJ6F.P1OsVs9Tnc.RHzBOdu', '1997-10-16', NULL, 'U', 'I', 'Voluptatem delectus perferendis at dolorem voluptas asperiores animi.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:02', '2016-11-16 01:44:02'),
(9, 'Hans Marvin', 'akeem12', NULL, 'rosario14@example.net', '$2y$10$HMg6Zq4cS8TgkoND9NKyfeGorTScGljcdGdvGhQdbZyAoQxlHocxe', '1927-01-27', NULL, 'U', 'I', 'Occaecati assumenda animi maxime quia cupiditate illo.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:03', '2016-11-16 01:44:03'),
(10, 'Jeff Turcotte', 'garrick97', NULL, 'renner.orville@example.net', '$2y$10$jUOUJJ7BldTS0KP0HpqxOexIa1WnhDf9E.g/PD75lQisp8vS7F0S2', '1931-04-09', NULL, 'U', 'I', 'Qui ex totam unde blanditiis.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 01:44:03', '2016-11-16 01:44:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_active_token_index` (`active_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
