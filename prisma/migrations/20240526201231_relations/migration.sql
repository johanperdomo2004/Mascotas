-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
