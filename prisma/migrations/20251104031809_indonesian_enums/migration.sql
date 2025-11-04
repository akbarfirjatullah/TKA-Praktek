/*
  Warnings:

  - You are about to alter the column `status` on the `attendance` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - The values [student,employee] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `attendance` MODIFY `status` ENUM('hadir', 'izin', 'sakit', 'alpha') NOT NULL DEFAULT 'hadir';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('siswa', 'karyawan', 'admin') NOT NULL;
